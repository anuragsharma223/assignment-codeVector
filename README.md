# assignment-codeVector

In this assignment I decided to go with drizzle orm because its easier to handle db migrations and its very closer to SQL.
The database choice is postgres because its opensource plus I am most familiar with it. Plus the features it has are very handy with large open source docs to help me whereever I am stuck.

Now regarding the server setup I chose a typescript nodejs express backend. Typescript so I can catch errors at compile time.

## Why did I go for indexing on the db and how it helped with query timings ?

I implemented pagination because we were expected to get the items based on their updated at time. Now since updated at time can be similar I chose to go with indexing it with ids. As ids are primary keys they helped in going from a search query type from a time of around 500ms to well below 100ms which is about 5 times faster. As compared to no indexing. If it were not indexing we would have to do a full page scan in the doubly linked list in the B-Tree which is very inefficient. So as to reduce it to range based search I introduced indexing in the db. But that assuming most of the operations are read. Because if we write on the db there is an over head cost of managing indexes hence. There was a trade off to make. So I went with indexing. But there were obvious trade off in Update, delete, insert queries. As the B-TREE has to balance itself.

### Which type of pagination I choose and why ?

Now for the pagination method that I chose it was cursor based pagination simply for the requirements basis. Because in page offset based pagination if we remove some data entries. Some data can appear twice or some can be omitted which can lead to inconsistencies. So for this requirement I CHOSE CURSOR BASES PAGINATION.

### Now on how to use this api.

Simply paste the url in postman or similar service. I used postman. Now for the query paramenters I used limits, cursorId, cursorUpdatedAt and category as the query parameters. Simply use them from the next cursor and then paste it in the query and now we can successfully use the db.
