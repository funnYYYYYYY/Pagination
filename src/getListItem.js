export const getListItem = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b class = "info-team-general-color">Likes: <b class  = "info-team-second-color">${likes}</b> </b>
    </p>
    <p class="info-item">
      <b class = "info-team-general-color">Views: <b class  = "info-team-second-color">${views}</b></b>
    </p>
    <p class="info-item">
      <b class = "info-team-general-color">Comments: <b class = "info-team-second-color">${comments}</b></b>
      </p>
    <p class="info-item">
      <b class = "info-team-general-color">Downloads: <b class  = "info-team-second-color">${downloads}</b></b>
    </p>
  </div>
</div>`;
