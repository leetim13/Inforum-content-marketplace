## Demo Video for CSC 491
- ```491_demo_user_bank_admin_final.mp4```
- https://drive.google.com/drive/folders/18w_t76I2msYCDTKeIOL9MqZMQX1-I8Zq

## Demo Writeup
### Intro
Inforum is a promotional content marketplace that aims to market to hard-to-reach demographics by utilizing network effects on social media platforms such as Facebook, Twitter, and Instagram (we will only focus on Facebook for our MVP). On our platform, our users can share offers to their social media for personal monetary benefit, and the banks are able to use our users to promote their offerings to our users’ network via a trusted source, creating a win-win situation for both parties. 

The demo video is splitted into three parts representing the different role types: users (ie., the“promoters”), banks, and admin. This also corresponds to our three use cases.

### Users
Users will be asked to log in or sign up in order to share a campaign and we will use the users’ sign up information to generate insights for the banks. For our MVP, we are only collecting gender and age-group, but other features such as location, occupation, etc. could be collected as well.

On the landing page, users can filter campaigns by banks or by offer type (e.g., products, articles, etc.) and once they have decided on a campaign they can learn more about the campaign itself or share the campaign.

For sharing, the users simply have to copy our unique auto-generated url and make a post on their social media account, then paste back their post URL. For our post verification during our MVP, we simply check if the post actually exists (via web scraping), but more complex verification checks such as bot-detection would be implemented in the future.

Users also have a “My Posts” and “My Rewards” page to see the posts they have made for the different campaigns or check the number of reward points they have earned (calculated by click-through-rate). We currently only display the # of clicks for the past 7 days, and the reward points will only be calculated once a campaign has expired.

### Banks
Our banking partners will have the ability to create a campaign, which will then show up on the users’ end as well. They also have an “insights” for each of their campaigns that will display the total # of likes/clicks the campaign has earned in the past 7 days along with interactive dashboards of the promoters’ gender and age group. Note that overlays and interactive elements were added for all plots for accessible reasons. For our MVP, the banks have to manually click on the “generate insights” button for the insights to be collected (via web scraping), but we plan to create a daily or even hourly task for this in the future.

### Admin
Finally, the admins of our site (which represents the engineers in Inforum) will have access to all the data the users and banks have. This includes the site-wide insights for all campaigns (on an aggregate level) as well as the links to each of the users’ individuals posts for all their campaigns.

