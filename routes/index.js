const router = require('koa-router')()
const { transform, formatError } = require('grammkit/lib/util');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  console.log("aaaaa");
  try {
    query_data = ctx.query['data'];
    query_format = ctx.query['format'];
    console.log("------------------------------------------------------------");
    console.log(query_data);
    console.log(query_format);
    console.log("------------------------------------------------------------");
    // data = transform(query_data, query_format)["procesedGrammars"][0]["rules"];
    var result = transform(query_data, query_format);
    var grammars = result.procesedGrammars.map(({ rules, references, name }) => {
      var rules = rules.map(function (rule) {
        const ref = references[rule.name] || {};
        return {
          name: rule.name,
          diagram: rule.diagram,
          usedBy: ref.usedBy,
          references: ref.references
        };
      });

      return {
        name,
        rules
      };
    });
    // console.log(grammars);
    ctx.body = grammars[0]["rules"];
  } catch (err) {
    ctx.body = err.message;
  }
})

module.exports = router
