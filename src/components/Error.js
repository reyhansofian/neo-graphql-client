import React from 'react';

const Error = (props) => (
  <section className="vh-100 bg-washed-blue baskerville">
    <header className="tc ph5 lh-copy">
      <h1 className="f1 f-headline-l code mb3 fw9 dib tracked-tight light-purple">500</h1>
      <h2 className="tc f1-l fw1">{props.error.message}</h2>
    </header>
    <p
      onClick={() => window.location.reload()}
      className="fw1 i tc mt4 mt5-l f4 f3-l"
      style={{ cursor: 'pointer' }}
    >
      Refresh?
    </p>
  </section>
);

export { Error };
