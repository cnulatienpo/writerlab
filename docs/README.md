# writerlab

## Setup Instructions

The following commands install PDF handling, OCR, and text cleanup tools used in the project:

```
pip install --upgrade pip
pip install pdfminer.six
pip install pytesseract
sudo apt-get update && sudo apt-get install -y tesseract-ocr
pip install PyPDF2 pdf2image
pip install pillow opencv-python
pip install nltk spacy
python -m spacy download en_core_web_sm
```

## Quick Debugging Tips

Open the browser's DevTools console and log the main data objects to verify they
contain what you expect:

```js
console.log(currentAnalysisResult);
console.log(currentSceneBeats);
console.log(bookData);
```

If your charts or visual blocks aren't rendering, double‑check the following:

- Canvas IDs match between your HTML and JavaScript.
- `draw...()` functions are called after data loads.
- Containers aren't hidden with `display: none`.

