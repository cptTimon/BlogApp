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
  const articleTagsSelector = '.post-tags .list';
  const articleAuthorSelector = '.post-author';
  const tagsListSelector = 'ul.tags';
  const cloudClassCount = 5;
  const cloudClassPrefix = 'tag-size-';

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

  const generateTitleLinks = function(customSelector = ''){

    /* [DONE] remove list of links from left column */
    const titleList = document.querySelector(titleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    const articles = document.querySelectorAll(articleSelector + customSelector);
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

  const calculateTagClass = function (count, params) {
    /* find the difference between the most popular tag and the least popular*/
    const diff = count - params.min;

    const difference = params.max - params.min;

    const percentage = diff / difference;

    const classNumber = Math.floor(percentage * (cloudClassCount-1) + 1);

    return cloudClassPrefix + classNumber;

  }

  const calculateTagsParams = function(tags) {
    const params = {max:0, min:99999}

    for (let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if (tags[tag] > params.max){
        params.max = tags[tag];
      }
      if (tags[tag] < params.min){
        params.min = tags[tag];
      }

    }
    return params;
  }

  const generateTags = function (){

    /* [DONE] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(articleSelector);
    console.log(articles);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles){

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(articleTagsSelector);
      console.log(tagsWrapper);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* [DONE] generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(linkHTML);

        /* [DONE] add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]){

          /* [NEW] if it is not in allTags, add generated code to allTags array */
          allTags[tag] = 1;

          /* if it is, increase it's value by 1 */
        } else {
          allTags[tag]++;
        }

        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      console.log(tagsWrapper);

      /* [DONE] END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(tagsListSelector);
    console.log(tagList);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags) {

      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
      console.log(allTagsHTML);
      /* END LOOP: for each tag in allTags */
    }

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  };

  generateTags();

  const tagClickHandler = function (event){

    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant href=#tag-covid */
    const tag = href.replace('#tag-','');
    console.log(tag);

    /* [DONE] find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTags);

    /* [DONE] START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

      /* [DONE] remove class active */
      activeTag.classList.remove('active');

      /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const clickedTags = document.querySelectorAll('a[href="' + href + '"]');
    console.log(clickedTags);

    /* [DONE] START LOOP: for each found tag link */
    for (let foundTag of clickedTags) {

      /* [DONE] add class active */
      foundTag.classList.add('active');

      /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function (){

    /* [DONE] find all links to tags */
    const tags = document.querySelectorAll('a[href^="#tag-"]');
    console.log(tags);

    /* [DONE] START LOOP: for each link */
    for (let tag of tags) {

      /* [DONE] add tagClickHandler as event listener for that link */
      tag.addEventListener('click',tagClickHandler);

    /* [DONE] END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const generateAuthors = function (){

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(articleSelector);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {

      /* [DONE] find author wrapper */
      const authorWrapper = article.querySelector(articleAuthorSelector);
      console.log(authorWrapper);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get author from data-author attribute */
      const author = article.getAttribute('data-author');
      console.log(author);

      /* [DONE] generate HTML of the link */
      const linkHTML = '<a href="#author-' + author + '">' + author + '</a>';
      console.log(linkHTML);

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

      /* [DONE] insert HTML of author into the author wrapper */
      authorWrapper.innerHTML = html;
      console.log(authorWrapper);

    /* [DONE] END LOOP: for every article: */
    }
  };

  generateAuthors();

  const authorClickHandler = function (event){

    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-','');
    console.log(author);

    /* [DONE] find all tag links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* [DONE] START LOOP: for each active tag link */
    for (let activeAuthor of activeAuthors){

      /* [DONE] remove class active */
      activeAuthor.classList.remove('active');

      /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all author links with "href" attribute equal to the "href" constant */
    const clickedAuthors = document.querySelectorAll('a[href="' + href + '"]');
    console.log(clickedAuthors);

    /* [DONE] START LOOP: for each found author link */
    for (let author of clickedAuthors){

      /* [DONE] add class active */
      author.classList.add('active');

      /* [DONE] END LOOP: for each found author link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function (){

    /* [DONE] find all links to authors */
    const authors = document.querySelectorAll('a[href^="#author-"]');
    console.log(authors);

    /* [DONE] START LOOP: for each link */
    for (let author of authors){

      /* [DONE] add tagClickHandler as event listener for that link */
      author.addEventListener('click',authorClickHandler);

    /* [DONE] END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();
}
