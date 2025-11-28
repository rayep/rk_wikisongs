import { songNamePattern, URLFix, yearPattern } from "./common";

export function getAlbumMetadata(root) {
  let $vcard = $("table.vevent", root);
  let albumYear = $vcard
    .find(".infobox-label:contains(Release) ~ td")
    .text()
    .match(yearPattern)
    .join();
  let albumPoster = URLFix($vcard.find(".infobox-image img").attr("src"));
  return { albumYear, albumPoster };
}

export function getAlbumSongs(root) {
  let $album = $('td:contains(")', root);
  return $album
    .map(function () {
      let value = $(this).text();
      if (value.match(songNamePattern)) return $(this).text();
      return null;
    })
    .get();
}