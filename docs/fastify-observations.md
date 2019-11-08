# Fastify Observations

Some particular things we may want to be aware of when using Fastify.

1. "[with fastify everything is a plugin](https://www.fastify.io/docs/latest/Getting-Started/#your-first-plugin)" PROS: this makes loading very easy, very little syntax; CONS: adding a plugin could have unknown impact on the server state, and modifications might conflict with other plugins.  Therefore recent plugin installations would be a prime suspect if the project starts behaving strangely for unknown reasons.
2. If we ever needed to optimize high levels of traffic, generating "static" routes might be a really interesting tactic to take, [given that their performance is so much better](https://www.nearform.com/blog/reaching-ludicrous-speed-with-fastify/).
3. I looked at source code for [fastify-mongoose-driver](https://github.com/alex-ppg/fastify-mongoose) and [fastify-mongoose](https://github.com/Techie-Qabila/fastify-mongoose) before making a selection.  I chose fastify-mongoose because it makes fewer modifications to how the mongoose library runs, and because it is MIT license.  Although it's not documented, the configuration parameters provided by fastify-mongoose are mostly to satisfy [known mongoose deprecations](https://mongoosejs.com/docs/deprecations.html).
