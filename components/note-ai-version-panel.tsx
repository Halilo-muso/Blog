import React from "react";

type NoteAiVersionPanelProps = {
  contentHtml?: string;
  labels: {
    toggle: string;
    badge: string;
    description: string;
  };
};

export function NoteAiVersionPanel({ contentHtml, labels }: NoteAiVersionPanelProps) {
  if (!contentHtml) {
    return null;
  }

  return (
    <details className="note-ai-version-panel">
      <summary>
        <span>{labels.toggle}</span>
        <span aria-hidden="true">+</span>
      </summary>
      <div className="note-ai-version-body">
        <p className="note-ai-version-kicker">
          <span>{labels.badge}</span>
          <span>{labels.description}</span>
        </p>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </details>
  );
}
