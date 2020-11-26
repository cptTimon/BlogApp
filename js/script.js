'use strict';

{ console.log(document.querySelector('#template-article-link').innerHTML);
  console.log(Handlebars.compile(document.querySelector('#template-articleTag-link').innerHTML));
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagArticleLink: Handlebars.compile(document.querySelector('#template-articleTag-link').innerHTML),
    authorArticleLink: Handlebars.compile(document.querySelector('#template-articleAuthor-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
    authorRightColumnLink: Handlebars.compile(document.querySelector('#template-articleRightAuthor-link').innerHTML)
  };

  const cloudClassCount = 5;
  const cloudClassPrefix = 'tag-size-';

  const selectors = {
    titleList: '.titles',
    article: '.post',
    articleTitle: '.post-title',
    activeArticleLink: '.titles a.active',
    activeArticle: '.posts article.active',
    articleTags: '.post-tags .list',
    articleAuthor: '.post-author',
    tagsList: 'ul.tags',
    authorsList: 'ul.authors',
  };

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(selectors.activeArticleLink);

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(selectors.activeArticle);

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
    const titleList = document.querySelector(selectors.titleList);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    const articles = document.querySelectorAll(selectors.article + customSelector);
    console.log(articles);
    let html = '';
    for(let article of articles){

      /* [DONE] find ID of an article */
      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* [DONE] find title of an article */
      const articleTitle = article.querySelector(selectors.articleTitle).innerHTML;
      console.log(articleTitle);

      /* [DONE] create HTML of a link  [TASK 7.4]*/
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
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
    const diff = count - params.min;
    const difference = params.max - params.min;
    const percentage = diff / difference;
    const classNumber = Math.floor(percentage * (cloudClassCount-1) + 1);
    return cloudClassPrefix + classNumber;
  };

  const calculateTagsParams = function(tags) {
    const params = {max:0, min:99999};
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
  };

  const generateTags = function (){

    /* [NEW - DONE] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(selectors.article);
    console.log(articles);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles){

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(selectors.articleTags);
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

        /* [DONE] generate HTML of the link [TASK 7.4 - used HANDLEBARS]*/
        const linkHTMLData = {name: tag};
        const linkHTML = templates.tagArticleLink(linkHTMLData);
        /*const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>'; */
        console.log(linkHTML);

        /* [DONE] add generated code to html variable */
        html = html + linkHTML + ' ';

        /* [NEW - DONE] check if this link is NOT already in allTags */
        if(!allTags[tag]){

          /* [NEW - DONE] if it is not in allTags, add generated code to allTags array */
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

    /* [NEW - DONE] find list of tags in right column */
    const tagList = document.querySelector(selectors.tagsList);
    console.log(tagList);

    /* [NEW - DONE] calculate what is the highest and the lowest number of appearances of all tags */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW - DONE] create variable for all links HTML code [TASK 7.4] */
    const allTagsData = {tags: []};

    /* [NEW - DONE] START LOOP: for each tag in allTags: */
    for(let tag in allTags) {

      /* [NEW - DONE] generate code of a link and add it to allTagsHTML  [TASK 7.4]*/
      /* allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ') </a></li>'; */
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

      /* END LOOP: for each tag in allTags */
    }

    /*[NEW - DONE] add HTML from allTagsHTML to tagList [TASK 7.4]*/
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
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
    /* [NEW] create a new variable allAuthors with an empty object */
    const allAuthors = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(selectors.article);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {

      /* [DONE] find author wrapper */
      const authorWrapper = article.querySelector(selectors.articleAuthor);
      console.log(authorWrapper);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get author from data-author attribute */
      const author = article.getAttribute('data-author');
      console.log(author);

      /* [DONE] generate HTML of the link */
      const linkHTMLData = {name: author};
      const linkHTML = templates.authorArticleLink(linkHTMLData);
      /* const linkHTML = '<a href="#author-' + author + '">' + author + '</a>'; */
      console.log(linkHTML);

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allAuthors */
      if(!allAuthors[author]) {

        /* [NEW] if it is not in allTags, add generated code to allAuthors object */
        allAuthors[author] = 1;
      }

      /* if it is, increase it's value by 1 */
      else {
        allAuthors[author]++;
      }

      /* [DONE] insert HTML of author into the author wrapper */
      authorWrapper.innerHTML = html;
      console.log(authorWrapper);

    /* [DONE] END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const authorsList = document.querySelector(selectors.authorsList);
    console.log(authorsList);

    /* [NEW] create variable for all links HTML code */
    /* let allAuthorsHTML = ''; */
    const allAuthorsData = {authors: []};

    /* [NEW - DONE] START LOOP: for each tag in allAuthors: */
    for (let author in allAuthors){

      /* [NEW - DONE] generate code of a link and add it to allAuthorsHTML */
      /* allAuthorsHTML += '<li><a href="#author-'+ author + '"><span class="author-name">' + author + ' (' + allAuthors[author] + ')</span></a></li>'; */
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });

      /* END LOOP: for each tag in allTags */
    }

    /*[NEW - DONE] add HTML from allTagsHTML to tagList */
    authorsList.innerHTML = templates.authorRightColumnLink(allAuthorsData);

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
