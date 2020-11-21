/*
document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});
*/
{
  const titleListSelector = '.titles';
  const articleSelector = '.post';
  const articleTitleSelector = '.post-title';
  const activeArticleLinkSelector = '.titles a.active';
  const activeArticleSelector = '.posts article.active';
  const articleTagsSelector = '.post-tags .list'

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll(activeArticleLinkSelector);

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll(activeArticleSelector);

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */

    const path = clickedElement.getAttribute('href');
    console.log(path);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const chosenArticle = document.querySelector(path);
    console.log(chosenArticle);

    /* [DONE] add class 'active' to the correct article */

    chosenArticle.classList.add('active');
  };

  const generateTitleLinks = function(){

    /* [DONE] remove list of links from left column */

    const titleList = document.querySelector(titleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(articleSelector);
    console.log(articles);
    let html = '';
    for(let article of articles){

      /* [DONE] find ID of an article */

      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* [DONE] find title of an article */

      const articleTitle = article.querySelector(articleTitleSelector).innerHTML;
      console.log(articleTitle);

      /* [DONE] create HTML of a link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>'+ articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* [DONE] insert link into titleList */

      html = html + linkHTML;
      console.log(html);
    }

    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();
  function generateTags(){
    /* find all articles */

    const articles = document.querySelectorAll(articleSelector);
    console.log(articles);

    /* START LOOP: for every article: */

    for (let article of articles){
      /* find tags wrapper */

      const tagsWrapper = article.querySelector(articleTagsSelector);
      console.log(tagsWrapper);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */

      tagsWrapper.innerHTML = html;
      console.log(tagsWrapper);
    /* END LOOP: for every article: */

    }
  }

  generateTags();
}
