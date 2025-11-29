import { URLFix } from "./common";

export function getComposerMetadata(root) {
  var $vcard = $("table.vcard", root);
  var $vcard_rows = $vcard.find("tr");
  var composerName = $vcard.find(".infobox-above").text().trim();
  var composerPic = URLFix($vcard.find(".infobox-image img").attr("src"));
  var yearsActive = $vcard_rows
    .find(".infobox-label:contains(Years) ~ td")
    .text();
  return { composerName, composerPic, yearsActive };
}

export function getComposerAlbums(root) {
  let $albums = $("td > i > a", root);
  return $albums
    .map(function () {
      let $a = $(this);
      let albumName = $a.attr("title").replaceAll(" ", "_");
      let isLinkValid = !$a.hasClass("new");
      return { albumName, isLinkValid };
    })
    .get();
}