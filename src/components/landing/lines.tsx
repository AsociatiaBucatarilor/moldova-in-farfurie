import React from 'react'

// Admin textareas use line breaks to control how headings wrap.
export const lines = (text?: string | null) =>
  (text || '').split('\n').map((line, i, all) => (
    <React.Fragment key={i}>
      {line}
      {i < all.length - 1 && <br />}
    </React.Fragment>
  ))
