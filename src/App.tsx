import { Converter } from 'showdown';
import { useState } from 'react';

function App() {
  const [showNotify, setShowNotify] = useState<boolean>(false);

  const converter = new Converter();

  const onCopy = async () => {
    setShowNotify(true);

    const clipboardContents = await navigator.clipboard.readText();
    const convertedHTML = converter.makeHtml(clipboardContents);
    const formattedHTML = convertedHTML.replace(
      '<p><strong>Examples:</strong></p>',
      '<br>\n<p><strong>Examples:</strong></p>'
    );

    await navigator.clipboard.writeText(formattedHTML);

    const target = document.getElementById('target')!;
    target.innerHTML = convertedHTML;

    setTimeout(() => {
      setShowNotify(false);
    }, 500);
  };

  return (
    <main>
      <div id="target"></div>
      <button onClick={onCopy}>Copy</button>
      {showNotify ? <p>✅ Copied...</p> : null}
    </main>
  );
}

export default App;
