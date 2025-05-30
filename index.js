

//In Synchronous way
/*const a = fs.readFileSync('./input.txt','utf-8')
console.log(a)

const b = `Hi iam vinoth and iam a pro backed developer and a ssc cgl aspirant: ${a} from ${Date.now()}`
fs.writeFileSync('./output.txt', b, 'utf-8')
console.log('File written successfully!')

//In Asynchronous way
 fs.readFile('./start.txt','utf-8',(err,data1)=>{
    fs.readFile(`./${data1}.txt`,'utf-8',(err,data2)=>{
        console.log(data2)
        fs.readFile('./append.txt','utf-8',(err,data3)=>{
            console.log(data3)
            fs.writeFile('./output.txt',`${data2}\n${data3}`, 'utf-8', (err)=>{
                console.log('File written successfully!')
            })
        })
    })
})
console.log("Will reading wait!!!!")*/
const slugify = require('slugify')

const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  
  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const slugs = dataObj.map(el => slugify(el.productName, {lower: true})); // Example of slugify usage

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const server = http.createServer((req, res) => {

   const {query,pathname} = url.parse(req.url, true)
  console.log(`Request received for: ${pathname}`);

  // Overview Page
  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCTSCARDS%}', cardsHtml);
    res.end(output);

  // SSC Route
  }
else if (pathname === '/product') {
  const id = query.id;
  const product = dataObj[id];

  if (!product) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    return res.end('<h1>Product not found!</h1>');
  }

  res.writeHead(200, { 'Content-type': 'text/html' });
  const output = replaceTemplate(tempProduct, product);
  res.end(output);
}

  
  else if (pathname === '/ssc') {
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end("Congratulations you're selected for SSC CGL! Score: 340/390 ASO in AFHQ");

  // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);

  // 404
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, () => {
  console.log('Listening to requests on port 8000');
});


