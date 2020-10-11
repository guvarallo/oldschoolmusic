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
      let artistsData = data.results.filter(result => result.type === 'artist');
      let mastersData = data.results.filter(result => result.type === 'master');
      let artists = {
        id: artistsData[0].id,
        img: artistsData[0].cover_image,
        title: artistsData[0].title,
        url: artistsData[0].resource_url
      };
      let masters = mastersData.map(result => {
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
      return {
        id: data.id,
        img: data.images[0].resource_url,
        name: data.name,
        members: data.members
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
      return data.releases.map(release => ({
          id: release.id,
          img: release.thumb,
          title: release.title,
          year: release.year
      }))
    })
  }

}

export default Discogs;