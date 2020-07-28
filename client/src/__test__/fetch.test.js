import { fetchData, API } from "../components/fetch";

import axios from "axios";
jest.mock("axios");

describe("fetchData", () => {
  it("fetches successfully data from an API", async () => {
    const data = {
      data: {
        hits: [
          {
            objectID: "1",
            title: "a",
          },
          {
            objectID: "2",
            title: "b",
          },
        ],
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(fetchData("react")).resolves.toEqual(data);

    expect(axios.get).toHaveBeenCalledWith(`${API}/search?query=react`);
  });
});
