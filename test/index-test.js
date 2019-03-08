var middleware = require('../index'), 
    httpMocks = require('node-mocks-http'),
    req = {}, 
    res = {}
;

describe('Express Boom middleware test', function(){
    context('Verify if the boom module is loaded on the middleware', function() {
        beforeEach(function(done) {

            req = httpMocks.createRequest({
                method: 'GET',
                url: '/test/path?myid=312',
                query: {
                    myid: '312'
                }
            });
            res = httpMocks.createResponse();
            
            done();
        });
        
        it('Should find the module loaded', (done) => {
            middleware()(req, res, next => {
                if (!res.boom) {
                    throw new Error('Boom is not loaded on the response');
                }
                done();
            })
        });

        it('Should find the badRequest function', (done) => {
          middleware()(req, res, next => {
              if (!res.boom.badRequest) {
                throw new Error('BadRequest function is not found on the response');
              }
              done();
          })  
        });
    });
});