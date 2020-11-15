/*
document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});
*/
{
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
    
    /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
    /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

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
}
  
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

const titleListSelector = '.titles';
const articleSelector = '.post';
const articleTitleSelector = '.post-title';
function generateTitleLinks(){

  /* remove list of links from left column */

  const titleList = document.querySelector(titleListSelector);
  titleList.innerHTML = '';
  
  /* for each article */

  const articles = document.querySelectorAll(articleSelector);
  console.log(articles);
  let html = '';
  for(let article of articles){

    /* find ID of an article */

    const articleId = article.getAttribute('id');
    console.log(articleId);
  
    /* find title of an article */

    const articleTitle = article.querySelector(articleTitleSelector).innerHTML;
    console.log(articleTitle);
  
    /* create HTML of a link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>'+ articleTitle + '</span></a></li>';
    console.log(linkHTML);
  
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks();
}