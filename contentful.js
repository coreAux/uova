const spaceID = "lja77iq1ses6";
const environmentID = "master";
const accessToken = "ww54Kxi4UUh8XA2jaGFXzUArbX5wIsf1EaOdeWJCCr4";

const url = `https://cdn.contentful.com/spaces/${spaceID}/environments/${environmentID}/entries?access_token=${accessToken}&order=-fields.price&content_type=menuItem`;

const sectionTag = document.querySelector("section.grid");

const grabData = () => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Store the assets somewhere
      const assets = data.includes.Asset;

      // Turn our contentful data into something more useable
      return data.items.map((item) => {
        let imageUrl = "image1.jpg";

        const imageID = item.fields.image.sys.id;

        const imageData = assets.find((asset) => {
          return asset.sys.id == imageID;
        });

        if (imageData) {
          imageUrl = imageData.fields.file.url;
        }

        item.fields.image = imageUrl;
        return item.fields;
      });
    });
};

// Run grabData function on load
grabData().then((data) => {
  // In here do something with the returned data

  // Remove the loader
  sectionTag.innerHTML = "";

  data.forEach((item) => {
    sectionTag.innerHTML =
      sectionTag.innerHTML +
      `
      <div class="item">
        <img src="https://${item.image}">
        <div class="title">
          <h2>${item.title}</h2>
          <p>${item.price}</p>
        </div>
        <p>${item.description}</p>
      </div>
    `;
  });
});
