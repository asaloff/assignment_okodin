process.env.NODE_ENV = 'test';
require('./config');
const SearchService = require('../services/search-service');
const models = require('../models');
const { User, Profile, Location, Like } = models;
const timeHelper = require('../helpers/timeHelper');

describe("SearchService", () => {
  beforeEach(async (done) => {
    user1 = await User.create({ username: 'bob', email: 'bob@example.com' });
    user2 = await User.create({ username: 'frank', email: 'frank@example.com' });
    user3 = await User.create({ username: 'sarah', email: 'sarah@example.com' });
    done();
  });

  describe(".findProfiles", () => {
    beforeEach(() => {
      query = {
        "profile": {
          "minAge": "",
          "maxAge": "",
          "location": {
            "distance": ""
          }
        }
      };
    });

    it("finds all profiles with no query", async (done) => {
      const profile = await Profile.create({ UserId: user1.id });

      SearchService.findProfiles(query)
        .then(results => {
          let { profiles } = results;
          expect(profiles[0].id).toEqual(profile.id);
          done();
        });
    });

    describe("basic querying", () => {
      it("searches for the correct gender", async (done) => {
        query.profile.gender = "male";

        const maleProfile = await Profile.create({ UserId: user1.id, gender: "male" });
        const femaleProfile = await Profile.create({ UserId: user2.id, gender: "female" });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles.length).toEqual(1);
            expect(profiles[0].id).toEqual(maleProfile.id);
            done();
          });
      });

      it("searches for minimum age", async (done) => {
        query.profile.minAge = 30;

        const youngProfile = await Profile.create({ UserId: user1.id, age: 25 });
        const olderProfile = await Profile.create({ UserId: user2.id, age: 32 });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles.length).toEqual(1);
            expect(profiles[0].id).toEqual(olderProfile.id);
            done();
          });
      });

      it("searches for maximum age", async (done) => {
        query.profile.maxAge = 40;

        const youngProfile = await Profile.create({ UserId: user1.id, age: 25 });
        const olderProfile = await Profile.create({ UserId: user2.id, age: 41 });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles.length).toEqual(1);
            expect(profiles[0].id).toEqual(youngProfile.id);
            done();
          });
      });

      it("throws an error if the min age is more than the max", async (done) => {
        query.profile.minAge = 40;
        query.profile.maxAge = 35;

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            done.fail('min age was allowed to be greater than max age');
          })
          .catch(e => {
            expect(e.message).toEqual('Minimum age cannot be greater than maximum age');
            done();
          });
      });

      it("searches for an age between min and max age", async (done) => {
        query.profile.minAge = 35;
        query.profile.maxAge = 40;

        const youngProfile = await Profile.create({ UserId: user1.id, age: 25 });
        const olderProfile = await Profile.create({ UserId: user2.id, age: 38 });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles.length).toEqual(1);
            expect(profiles[0].id).toEqual(olderProfile.id);
            done();
          });
      });

      it("searches for minimum height", async (done) => {
        query.profile.minHeight = "5' 9\"";

        const shortProfile = await Profile.create({ UserId: user1.id, height: "5' 4\"" });
        const tallProfile = await Profile.create({ UserId: user2.id, height: "5' 10\"" });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles.length).toEqual(1);
            expect(profiles[0].id).toEqual(tallProfile.id);
            done();
          });
      });

      it("searches for maximum height", async (done) => {
        query.profile.maxHeight = "6' 1\"";

        const shortProfile = await Profile.create({ UserId: user1.id, height: "5' 4\"" });
        const tallProfile = await Profile.create({ UserId: user2.id, height: "6' 2\"" });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles.length).toEqual(1);
            expect(profiles[0].id).toEqual(shortProfile.id);
            done();
          });
      });

      it("throws an error if the min height is more than the max", async (done) => {
        query.profile.minHeight = "6' 1\"";
        query.profile.maxHeight = "5' 1\"";

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            done.fail('min height was allowed to be greater than max height');
          })
          .catch(e => {
            expect(e.message).toEqual('Minimum height cannot be greater than maximum height');
            done();
          });
      });

      it("searches for an height between min and max height", async (done) => {
        query.profile.minHeight = "5' 1\"";
        query.profile.maxHeight = "6' 1\"";

        const shortProfile = await Profile.create({ UserId: user1.id, height: "5' 0\"" });
        const tallProfile = await Profile.create({ UserId: user2.id, height: "5' 5\"" });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles.length).toEqual(1);
            expect(profiles[0].id).toEqual(tallProfile.id);
            done();
          });
      });

      it("searches for the correct body type", async (done) => {
        query.profile.bodyType = "Lean";

        const leanProfile = await Profile.create({ UserId: user1.id, bodyType: "Lean" });
        const largeProfile = await Profile.create({ UserId: user2.id, bodyType: "A complete whale" });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles.length).toEqual(1);
            expect(profiles[0].id).toEqual(leanProfile.id);
            done();
          });
      });

      it("searches for the correct school", async (done) => {
        query.profile.school = "Thors Hammer";

        const thorProfile = await Profile.create({ UserId: user1.id, school: "Thors Hammer" });
        const odinProfile = await Profile.create({ UserId: user2.id, school: "Odin State" });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles.length).toEqual(1);
            expect(profiles[0].id).toEqual(thorProfile.id);
            done();
          });
      });

      it("searches for the correct number of children", async (done) => {
        query.profile.maxChildren = 0;

        const noChildrenProfile = await Profile.create({ UserId: user1.id, children: 0 });
        const childrenProfile = await Profile.create({ UserId: user2.id, children: 3 });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles.length).toEqual(1);
            expect(profiles[0].id).toEqual(noChildrenProfile.id);
            done();
          });
      });

      it("searches for the correct interest", async (done) => {
        query.profile.interest = "FOOOOD";

        const foodyProfile = await Profile.create({ UserId: user1.id, interest: "FOOOOD" });
        const dragonProfile = await Profile.create({ UserId: user2.id, interest: "Chasing dragons" });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles.length).toEqual(1);
            expect(profiles[0].id).toEqual(foodyProfile.id);
            done();
          });
      });
    });

    describe("location querying", () => {
      it("throws an error if there is a distance with no city", async (done) => {
        query.profile.location.distance = "2";

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            done.fail('did not throw error for distance without city');
          })
          .catch(e => {
            expect(e.message).toEqual('Distance provided without city');
            done();
          });
      });

      it("throws an error if there is a city with no distance", async (done) => {
        query.profile.location.distance = "";
        query.profile.location.city = "2";

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            done.fail('did not throw error for city without distance');
          })
          .catch(e => {
            expect(e.message).toEqual('City provided without distance');
            done();
          });
      });

      it("returns profiles within the correct distance of the city", async (done) => {
        query.profile.location.distance = "1";
        query.profile.location.city = "Alrekstad::4";

        let city1 = await Location.create({ distance: 5, city: 'Aalborg' });
        let city2 = await Location.create({ distance: 0, city: 'Borrering' });
        let closeProfile = await Profile.create({ UserId: user1.id, LocationId: city1.id });
        let farProfile = await Profile.create({ UserId: user2.id, LocationId: city2.id });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles.length).toEqual(1);
            expect(profiles[0].id).toEqual(closeProfile.id);
            done();
          });
      });
    });

    describe("sorting", () => {
      it("sorts by distance", async (done) => {
        query.profile.sort = "distance";

        let city1 = await Location.create({ distance: 5, city: 'Aalborg' });
        let city2 = await Location.create({ distance: 7, city: 'Borrering' });
        let city3 = await Location.create({ distance: 1, city: 'Alrekstad' });
        let profile1 = await Profile.create({ UserId: user1.id, LocationId: city1.id });
        let profile2 = await Profile.create({ UserId: user2.id, LocationId: city2.id });
        let profile3 = await Profile.create({ UserId: user3.id, LocationId: city3.id });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles[0].id).toEqual(profile3.id);
            expect(profiles[1].id).toEqual(profile1.id);
            expect(profiles[2].id).toEqual(profile2.id);
            done();
          });
      });

      it("sorts by age", async (done) => {
        query.profile.sort = "age";

        let profile1 = await Profile.create({ UserId: user1.id, age: 18 });
        let profile2 = await Profile.create({ UserId: user2.id, age: 25 });
        let profile3 = await Profile.create({ UserId: user3.id, age: 20 });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles[0].id).toEqual(profile1.id);
            expect(profiles[1].id).toEqual(profile3.id);
            expect(profiles[2].id).toEqual(profile2.id);
            done();
          });
      });

      it("sorts by last login", async (done) => {
        query.profile.sort = "lastLogin";

        await User.update({ lastLogin: timeHelper.getTime() }, { where: { id: user2.id } });
        await User.update({ lastLogin: '2017-11-09 04:05:00' }, { where: { id: user1.id } });
        await User.update({ lastLogin: '2017-11-20 04:05:00' }, { where: { id: user3.id } });
        let profile1 = await Profile.create({ UserId: user1.id });
        let profile2 = await Profile.create({ UserId: user2.id });
        let profile3 = await Profile.create({ UserId: user3.id });

        SearchService.findProfiles(query)
          .then(results => {
            let { profiles } = results;
            expect(profiles[0].id).toEqual(profile2.id);
            expect(profiles[1].id).toEqual(profile3.id);
            expect(profiles[2].id).toEqual(profile1.id);
            done();
          });
      });
    });
  });

  describe('.findMutualLikes', () => {
    it('returns the likes that also liked back', async (done) => {
      let like1 = await Like.create({ LikerId: user1.id, LikedId: user2.id });
      let like2 = await Like.create({ LikerId: user2.id, LikedId: user1.id });
      let likes = [ { username: user1.username, Profile: {}, Like: like1 } ];
      let liked = [ { username: user2.username, Profile: {}, Like: like2 } ];

      SearchService.findMutualLikes(likes, liked)
        .then(mutualLikes => {
          expect(mutualLikes.length).toEqual(1);
          expect(mutualLikes[0].username).toEqual(user2.username);
          done();
        })
        .catch(e => {
          done.fail(e);
        });
    });

    it('does not return likes that did not like back', async (done) => {
      let like1 = await Like.create({ LikerId: user1.id, LikedId: user2.id });
      let like2 = await Like.create({ LikerId: user1.id, LikedId: user3.id });

      let likes = [ { username: user1.username, Profile: {}, Like: like1 } ];
      let liked = [ { username: user3.username, Profile: {}, Like: like2 } ];

      SearchService.findMutualLikes(likes, liked)
        .then(mutualLikes => {
          expect(mutualLikes.length).toEqual(0);
          done();
        })
        .catch(e => {
          done.fail(e);
        });
    });

    it('does not return people that liked but were not liked back', async (done) => {
      let like1 = await Like.create({ LikerId: user2.id, LikedId: user1.id });
      let like2 = await Like.create({ LikerId: user3.id, LikedId: user1.id });

      let likes = [ { username: user2.username, Profile: {}, Like: like1 } ];
      let liked = [ { username: user3.username, Profile: {}, Like: like2 } ];

      SearchService.findMutualLikes(likes, liked)
        .then(mutualLikes => {
          expect(mutualLikes.length).toEqual(0);
          done();
        })
        .catch(e => {
          done.fail(e);
        });
    });
  });
});
