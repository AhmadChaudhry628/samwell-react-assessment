import {
  getAllCandidates,
  getAllApplications,
  getAllQuestions,
} from "./Utils/api-services";

const axios = require("axios");
jest.mock("axios");

describe("API functions", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAllCandidates", () => {
    beforeEach(() => {
      jest.spyOn(console, "log");
    });

    afterEach(() => {
      jest.resetAllMocks();
      console.log.mockRestore();
    });
    it("should return all candidates", async () => {
      const mockCandidates = [
        {
          id: 1372,
          name: "Sara Marshall",
          applicationId: 171,
        },
        {
          id: 1379,
          name: "Olessia Anderson",
          applicationId: 177,
        },
      ];
      axios.get.mockResolvedValueOnce({ data: mockCandidates });

      const result = await getAllCandidates();
      expect(result.data).toEqual(mockCandidates);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith("/candidates");
    });

    it("should return null when there is an error", async () => {
      const result = await getAllCandidates();
      axios.get.mockRejectedValueOnce(new Error("Failed to fetch candidates"));
      expect(result).toBeNull();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith("/candidates");
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAllApplications", () => {
    beforeEach(() => {
      jest.spyOn(console, "log");
    });

    afterEach(() => {
      jest.resetAllMocks();
      console.log.mockRestore();
    });
    it("should return all applications", async () => {
      const mockApplications = [
        {
          id: 171,
          videos: [
            {
              src: "https://dashboard.knockri.com/assets?f=124546.mp4",
              questionId: 12,
              comments: "",
            },
            {
              src: "https://dashboard.knockri.com/assets?f=32343.mp4",
              questionId: 14,
              comments: "",
            },
            {
              src: "https://dashboard.knockri.com/assets?f=3545646.mp4",
              questionId: 21,
              comments: "",
            },
          ],
        },
      ];
      axios.get.mockResolvedValueOnce({ data: mockApplications });

      const result = await getAllApplications();

      expect(result.data).toEqual(mockApplications);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith("/applications");
    });

    it("should return null when there is an error", async () => {
      axios.get.mockRejectedValueOnce(
        new Error("Failed to fetch applications")
      );

      const result = await getAllApplications();

      expect(result).toBeNull();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith("/applications");
      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAllQuestions", () => {
    beforeEach(() => {
      jest.spyOn(console, "log");
    });

    afterEach(() => {
      jest.resetAllMocks();
      console.log.mockRestore();
    });
    it("should return all questions", async () => {
      const mockQuestions = [
        {
          id: 12,
          question: "Tell us about yourself.",
        },
        {
          id: 14,
          question: "Define what good customer service means to you.",
        },
        {
          id: 17,
          question: "Why are you interested in a career in consulting?",
        },
      ];
      axios.get.mockResolvedValueOnce({ data: mockQuestions });

      const result = await getAllQuestions();

      expect(result.data).toEqual(mockQuestions);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith("/questions");
    });

    it("should return null when there is an error", async () => {
      axios.get.mockRejectedValueOnce(new Error("Failed to fetch questions"));

      const result = await getAllQuestions();

      expect(result).toBeNull();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith("/questions");
      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });
});
