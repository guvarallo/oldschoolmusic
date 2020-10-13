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
      const artistsData = data.results.filter(result => result.type === 'artist');
      const mastersData = data.results.filter(result => result.type === 'master');
      const artists = {
        id: artistsData[0].id,
        img: artistsData[0].cover_image,
        title: artistsData[0].title,
        url: artistsData[0].resource_url,
        uri: artistsData[0].uri
      };
      const masters = mastersData.map(result => {
        return {
          id: result.id,
          img: result.thumb,
          title: result.title,
          type: result.type,
          uri: result.uri
        }
      });
      return [artists, masters];
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
          year: release.year,
          type: release.type
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