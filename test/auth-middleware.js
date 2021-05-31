const expect = require('chai').expect;
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middleware/is-auth');

describe('Auth middleware', function() {
    it('should throw an error if no auhtorization token present', function() {
        const req = {
            get: function() {
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated.');
    });

    it('should throw an error if the authorization header is only one string', function() {
        const req = {
            get: function(headerName) {
                return 'xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });

    it('should throw an error if the token cannot be verified', function(){
        const req = {
            get: function(headerName) {
                return 'Bearer xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });

    it('should yield a userId after decoding the token', function(){
        const req = {
            get: function(headerName) {
                return 'Bearer xyzasdgdfgdfghdfgbvcdfsg';
            }
        };
        jwt.verify = function(){
            return { userId: 'ade'};
        };
        authMiddleware(req, {}, () => {});
        expect(req).to.have.property('userId');
    });
});