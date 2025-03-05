import { Converter } from 'showdown';
import { useState } from 'react';

function App() {
  const [showNotify, setShowNotify] = useState<boolean>(false);

  const converter = new Converter();

  const onCopy = async () => {
    setShowNotify(false);

    const clipboardContents = await navigator.clipboard.readText();

    if (!clipboardContents.includes('**')) {
      return;
    }

    setShowNotify(true);

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
      <section>
        <h1>
          Markdown2HTML{' '}
          {showNotify ? (
            <span>Copied</span>
          ) : (
            <span className="hidde">Copied</span>
          )}
        </h1>
        <button onClick={onCopy}>Paste and Copy 📋</button>
      </section>
      <section></section>
    </main>
  );
}

export default App;
