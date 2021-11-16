import { parseImage } from './parseImage';

export const getHikeThumbnailUrl = hike => {
  const thumbnail = getHikeThumbnail(hike);
  if (!thumbnail) return '';
  return `https://images.hiker.family/${hike.slug}/${thumbnail}.jpg?nf_resize=smartcrop&w=300&h=400`;
}

const getHikeThumbnail = hike => {
  try {
    if (hike.thumbnail) return hike.thumbnail;
    if (!hike.images || !hike.images.length) return false;
    const thumbnail = hike.images.map(parseImage).find(x => !x.isMap);
    if (!thumbnail) return false;
    return thumbnail.name;
  } catch(e) {
    e.message = `Cannot find preview image name for ${hike.slug}. ${e.message}`;
    throw e;
  }
}
