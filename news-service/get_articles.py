from gnews import GNews
from typing import List, Dict

gnews = GNews()

def getNArticles(topic: str, max_articles: int=5) -> List[Dict|None]:
    gnews.max_results = max_articles
    results = gnews.get_news(topic)
    articles = []
    for article in results:
        # full_article = gnews.get_full_article(article['url'])
        # if full_article:
        articles.append(
            {
                "description": article['description'],
                "title": article['title'],
                "url": article['url']
            }
        )
    return None if len(articles) == 0 else articles


def getFullArticle(url: str):
    full_article = gnews.get_full_article(url)

    if full_article:
        return {"text": full_article.text.replace("\nAdvertisement\n", "")}
    return None