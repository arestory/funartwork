import axios from 'axios'

axios.defaults.baseURL = "http://49.235.134.252:9595/";
export function getMainPageData (page, callback) {

  return axios.get("artwork/main/" + page).then(res => {

    console.log(res);
    callback(res.data)
  });
}

export function search (keyword, page, type, success, fail) {

  return axios.get("artwork/search/" + keyword + "/" + page, {

    params: {

      type: type
    }
  }).then(res => {

    if (res.status == 200) {
      success(res.data)

    } else {
      fail();
    }
  });
}
export function getActressInfo (id, callback) {

  return axios.get("artwork/actressInfo", {
    params: {

      id: id
    }
  }).then(res => {

    callback(res.data)
  });
}

export function getActressWork (id, page, callback) {

  return axios.get("artwork/actress", {
    params: {

      id: id
      , page: page,
    }
  }).then(res => {

    callback(res.data)
  });
}
export function getDownloadUrl (code, callback) {

  return axios.get("artwork/video/" + code).then(res => {

    callback(res.data)
  });
}

export function getArtworkDetail (code, callback) {

  return axios.get("artwork/" + code).then(res => {

    callback(res.data)
  });
}
