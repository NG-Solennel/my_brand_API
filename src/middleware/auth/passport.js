import passport from "passport";
import User from "../../model/User";
import passportJwt from "passport-jwt";

const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOK_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ _id: jwtPayload.id });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
