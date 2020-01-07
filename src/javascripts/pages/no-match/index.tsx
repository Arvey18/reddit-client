import React, {ReactElement} from 'react';

export default function NoMatch(props: any): ReactElement {
  // use effects
  React.useEffect(() => {});

  return (
    <div id="nomatch">
      <div>
        <h1>Page not Found!</h1>
      </div>
    </div>
  );
}
