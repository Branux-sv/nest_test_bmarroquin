import { Test, TestingModule } from '@nestjs/testing';
import { SNSEventMapperController } from './sns-event-mapper.controller';
import { SNSEventMapperService } from './sns-event-mapper.service';
import * as testData from './test_data/sns-event-mapper.test.data';

describe('SNS Event Mapper Controller', () => {
  let snsEventMapperController: SNSEventMapperController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SNSEventMapperController],
      providers: [SNSEventMapperService],
    }).compile();

    snsEventMapperController = app.get<SNSEventMapperController>(
      SNSEventMapperController,
    );
  });

  describe('Get Mapped Response Method', () => {
    it('Should return a valid response - happy path', () => {
      const expectedResponse = [
        {
          spam: true,
          virus: true,
          dns: true,
          mes: 'September',
          retrasado: false,
          emisor: '61967230-7A45-4A9D-BEC9-87CBCF2211C9',
          receptor: ['recipient'],
        },
      ];

      const mappedResponse = snsEventMapperController.getSnsEventMappedResponse(
        testData.initSampleSesSnsEvent,
      );

      expect(mappedResponse).toBeDefined();
      expect(mappedResponse).toHaveLength(1);
      expect(mappedResponse).toEqual(expectedResponse);
    });

    it('Should return a valid response with a different input object', () => {
      const expectedResponse = [
        {
          spam: true,
          virus: false,
          dns: false,
          mes: 'January',
          retrasado: true,
          emisor: 'Jack_2025',
          receptor: ['recipient', 'fake_user', 'john_123'],
        },
      ];

      const mappedResponse = snsEventMapperController.getSnsEventMappedResponse(
        testData.sampleTwoSesSnsEvent,
      );

      expect(mappedResponse).toBeDefined();
      expect(mappedResponse).toHaveLength(1);
      expect(mappedResponse).toEqual(expectedResponse);
    });
  });
});
