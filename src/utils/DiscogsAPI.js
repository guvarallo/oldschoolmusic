import apiConfig from './apiKeys';

const url = 'https://api.discogs.com/database/search?';
const key = apiConfig.apiKey;

const Discogs = {

  search(term) {
    if (term === '') return;

    return fetch(`${url}q=${term}`, {
      headers: {
        Authorization: `Discogs token=${key}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const artistsData = data.results.filter(result => result.type === 'artist');
      const mastersData = data.results.filter(result => result.type === 'master');
      const artists = {
        id: artistsData[0].id,
        img: artistsData[0].cover_image,
        title: artistsData[0].title,
        url: artistsData[0].resource_url
      };
      const masters = mastersData.map(result => {
        return {
          id: result.id,
          img: result.thumb,
          title: result.title,
          master_url: result.master_url
        }
      });
      return [artists, masters];
    })
  },

  artist(url) {
    return fetch(url, {
      headers: {
        Authorization: `Discogs token=${key}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      return {
        id: data.id,
        img: data.images[0].resource_url,
        name: data.name,
      }
    })
  },

  releases(url) {
    return fetch(url, {
      headers: {
        Authorization: `Discogs token=${key}`
      }
    })
    .then(res => res.json())
    .then(data => {
      const releases = data.releases.map(release => ({
          id: release.id,
          img: release.thumb,
          title: release.title,
          year: release.year
      }));
      const pagination = {
        items: data.pagination.items,
        page: data.pagination.page,
        pages: data.pagination.pages,
        per_page: data.pagination.per_page
      }
      return [releases, pagination]
    })
  }

}

export default Discogs;