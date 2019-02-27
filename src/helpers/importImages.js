export const importImages = () => {
  let req = require.context('../images')
  let images = {};
  req.keys().map((item) => { 
    return images[item.replace('./', '')] = req(item)
  });
  return images;
}