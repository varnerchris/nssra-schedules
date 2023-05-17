import xml2js from 'xml2js';

export function parseXMLData(xmlData) {
  return new Promise((resolve, reject) => {
    const trimmedXmlData = xmlData.trim(); // Remove leading/trailing spaces
    //console.log(trimmedXmlData);
    const parser = new xml2js.Parser();
    parser.parseString(trimmedXmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
