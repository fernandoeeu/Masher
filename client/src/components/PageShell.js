import React from 'react'

const PageShell = Page => { 
  return props => 
    <div className="page">
        <Page {...props} />
    </div>;
};
export default PageShell;