import React from 'react';
import "./fileBrowser.css";
import fileList from './fileList.js';

function objectPath(obj, path) {
  if (path === "/" || path === "") {
    return obj;
  }
  if (path.lastIndexOf("/") === path.length - 1) {
    path = path.slice(0, -1);
  }
  if (path[0] === "/") {
    path = path.slice(1);
  }
  var result = obj;
  try {
    var props = path.split('/');
    props.every(function propsEveryCb(prop) {
      if (typeof result[prop] === 'undefined') {
        result = null;
        return false;
      }
      result = result[prop];
      return true;
    });
  } catch (e) {
    result = null;
  }
  return result;
};

function addBackButton() {
  if (window.location.pathname !== "/" && window.location.pathname !== "") {
    return (<div className='FileBrowser-list-folder'>
      <a href={window.location.href.substring(0, window.location.href.slice(0, -1).lastIndexOf('/')) + "/"}>../</a>
    </div>)
  }
}

function edt(obj, key) {
  if (obj[key].edition === undefined) {
    return "";
  } else {
    return "; " + obj[key].edition + " edition";
  }
}

function getFolderDir(path) {
  let obj = objectPath(fileList, path);

  if (obj === null) {
    return <h4> No such directory exists.</h4>;
  } else {
    return Object.keys(obj).map(function mapCb(key) {
      if (obj[key].type === "folder") {
        return (
          <div className='FileBrowser-list-folder' key={key}>
            <a href={window.location.href + (window.location.href[window.location.href.length - 1] === "/" ? "" : "/") + key + "/"}>{key}</a>
          </div>
        );
      } else if (obj[key].type === "file") { // file!
        return (
          <div className='FileBrowser-list-file' key={key}>
            <p><a target="_blank" rel="noopener noreferrer" href={window.location.href + (window.location.href[window.location.href.length - 1] === "/" ? "" : "/") + obj[key].file}>{obj[key].title}</a> ({obj[key].size})</p>
            <p><i>{obj[key].author}{edt(obj, key)}</i></p>
          </div>
        );
      }

      return null;
    });
  }
}

const App = () => (
  <div className='FileBrowser'>
    <h1>Owen's File Respository</h1>
    <h4>Current Directory: {window.location.pathname === "" ? "/" : window.location.pathname}</h4>
    <div className='FileBrowser-list'>
      {addBackButton()}
      {getFolderDir(window.location.pathname)}
    </div>
  </div>
);

export default App;
