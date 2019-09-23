import { Creators as PeopleActions, Types } from "../ducks/people";

describe("actions", () => {
  it("should create an action to set a TOTAL_RECORDS", () => {
    const expectedAction = {
      type: Types.TOTAL_RECORDS,
      payload: 87
    };
    expect(PeopleActions.setTotalRecords(87)).toEqual(expectedAction);
  });
});

describe("actions", () => {
  it("should create an action to set a LOADING", () => {
    const expectedAction = {
      type: Types.LOADING,
      payload: true
    };
    expect(PeopleActions.setLoading(true)).toEqual(expectedAction);
  });
});
