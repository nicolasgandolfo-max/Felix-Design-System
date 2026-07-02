import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { CaretRightIcon } from "@phosphor-icons/react";
import { GROUP_LABELS, GROUP_SLUGS, INVENTORY, slugify } from "../data";
import { SHOWCASES } from "../components-registry";
import { useTr } from "../i18n";

const VOID_TAGS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

/** Pretty-print a live DOM node as indented HTML. SVG internals are collapsed to keep the snippet readable. */
function formatNode(node: Node, indent: string, out: string[]) {
  if (node.nodeType === Node.TEXT_NODE) {
    const t = node.textContent?.trim();
    if (t) out.push(indent + t);
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const el = node as Element;
  const tag = el.tagName.toLowerCase();
  const attrs = [...el.attributes].map((a) => (a.value === "" ? a.name : `${a.name}="${a.value}"`)).join(" ");
  const openTag = attrs ? `<${tag} ${attrs}>` : `<${tag}>`;
  if (VOID_TAGS.has(tag)) {
    out.push(indent + openTag);
    return;
  }
  if (tag === "svg") {
    out.push(indent + openTag + "…</svg>");
    return;
  }
  const kids = [...el.childNodes].filter(
    (n) => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
  );
  if (kids.length === 0) {
    out.push(indent + openTag + `</${tag}>`);
    return;
  }
  if (kids.length === 1 && kids[0].nodeType === Node.TEXT_NODE) {
    out.push(indent + openTag + kids[0].textContent!.trim() + `</${tag}>`);
    return;
  }
  out.push(indent + openTag);
  kids.forEach((k) => formatNode(k, indent + "  ", out));
  out.push(indent + `</${tag}>`);
}

/**
 * Serialize the rendered showcase to readable HTML. Showcases are built from
 * labelled Demo panels (.panel > .ph + .cluster); we emit each panel's label
 * as a comment and only the actual component markup inside it.
 */
function captureHtml(root: HTMLElement): string {
  const panels = [...root.querySelectorAll(".panel")];
  const targets = panels.length
    ? panels.map((p) => ({
        label: p.querySelector(".ph")?.textContent ?? "",
        nodes: [...(p.querySelector(".cluster")?.childNodes ?? [])],
      }))
    : [{ label: "", nodes: [...root.childNodes] }];
  const out: string[] = [];
  targets.forEach((t, i) => {
    if (i > 0) out.push("");
    if (t.label) out.push(`<!-- ${t.label} -->`);
    t.nodes.forEach((n) => formatNode(n, "", out));
  });
  return out.join("\n");
}

/** One component's docs block: title, description, usage, live showcase, and an HTML-code disclosure. */
function ComponentBlock({ name, slug }: { name: string; slug: string }) {
  const tr = useTr();
  const entry = SHOWCASES[slug];
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  const toggle = () => {
    if (!open && showcaseRef.current) setHtml(captureHtml(showcaseRef.current));
    setOpen((o) => !o);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(html);
    } catch {
      // Clipboard API can be permission-gated (embedded browsers); fall back to execCommand.
      const ta = document.createElement("textarea");
      ta.value = html;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const Showcase = entry?.render;
  return (
    <div id={slug} className="comp-block">
      <h3 className="h3">{name}</h3>
      {entry && Showcase ? (
        <>
          <p className="comp-desc">{tr(entry.es, entry.en, entry.pt)}</p>
          {entry.usage && <p className="comp-usage">{tr(entry.usage.es, entry.usage.en, entry.usage.pt)}</p>}
          <div ref={showcaseRef}>
            <Showcase />
          </div>
          <button type="button" className="code-toggle" aria-expanded={open} onClick={toggle}>
            <CaretRightIcon />
            {open
              ? tr("Ocultar código", "Hide code", "Ocultar código")
              : tr("Ver código HTML", "View HTML code", "Ver código HTML")}
          </button>
          {open && (
            <div className="code-block">
              <button type="button" className="code-copy" onClick={copy}>
                {copied ? tr("¡Copiado!", "Copied!", "Copiado!") : tr("Copiar", "Copy", "Copiar")}
              </button>
              <pre>
                <code>{html}</code>
              </pre>
            </div>
          )}
        </>
      ) : (
        <div className="holder" style={{ marginTop: 8 }}>
          <p>
            {tr(
              "El showcase en vivo de este componente está en progreso. Por ahora podés verlo en el Storybook del repositorio.",
              "This component's live showcase is in progress. For now you can see it in the repo's Storybook.",
              "O showcase ao vivo deste componente está em andamento. Por enquanto você pode vê-lo no Storybook do repositório."
            )}
          </p>
        </div>
      )}
    </div>
  );
}

/** All components of one group (Atoms/Molecules/Organisms) on a single scrollable page. */
export function ComponentGroupPage() {
  const tr = useTr();
  const { groupSlug = "" } = useParams();
  const { hash } = useLocation();
  const group = INVENTORY.find((g) => GROUP_SLUGS[g.group] === groupSlug);

  // Scroll to the requested component whenever the hash changes (Sidebar links use #slug).
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    el?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [hash, group]);

  if (!group) {
    // Support old per-component links (e.g. /componentes/avatar) by redirecting into the group page.
    const legacyGroup = INVENTORY.find((g) => g.items.some((n) => slugify(n) === groupSlug));
    if (legacyGroup) {
      return <Navigate to={`/componentes/${GROUP_SLUGS[legacyGroup.group]}#${groupSlug}`} replace />;
    }
    return (
      <section className="sec flush">
        <Link to="/componentes" className="back-link">← {tr("Componentes", "Components", "Componentes")}</Link>
        <h2 className="h2">{tr("Grupo no encontrado", "Group not found", "Grupo não encontrado")}</h2>
        <p className="lead">{tr("Ese grupo no existe en el sistema.", "That group doesn't exist in the system.", "Esse grupo não existe no sistema.")}</p>
      </section>
    );
  }

  const label = GROUP_LABELS[group.group] ?? { es: group.group, en: group.group, pt: group.group };

  return (
    <section className="sec flush">
      <Link to="/componentes" className="back-link">← {tr("Componentes", "Components", "Componentes")}</Link>
      <div className="eyebrow"><span>{tr(label.es, label.en, label.pt)}</span></div>
      <h2 className="h2">{tr(label.es, label.en, label.pt)} · {group.items.length}</h2>
      <p className="lead">
        {tr(
          `Todos los componentes de ${label.es.toLowerCase()} del sistema, en una sola página.`,
          `Every ${label.en.toLowerCase()} component in the system, on one page.`,
          `Todos os componentes de ${label.pt.toLowerCase()} do sistema, em uma só página.`,
        )}
      </p>

      <nav className="comp-jump" aria-label={tr("Ir a componente", "Jump to component", "Ir para o componente")}>
        {group.items.map((name) => (
          <a key={name} href={`#${slugify(name)}`} className="comp-jump-link">{name}</a>
        ))}
      </nav>

      {group.items.map((name) => (
        <ComponentBlock key={name} name={name} slug={slugify(name)} />
      ))}
    </section>
  );
}
