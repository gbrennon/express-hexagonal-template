import { DependencyContainer } from "./DependencyContainer";

describe('DependencyContainer', () => {
  let container: DependencyContainer;

  beforeEach(() => {
    container = new DependencyContainer();
  });

  describe('register', () => {
    it('should store the provided instance under the given name', () => {
      // Arrange
      const mockService = { execute: jest.fn() };

      // Act
      container.register('MockService', mockService);

      // Assert
      expect(container['instances'].get('MockService')).toBe(mockService); // Directly check internal state
    });

    it('should overwrite an existing service if the same name is used', () => {
      // Arrange
      const mockService1 = { execute: jest.fn() };
      const mockService2 = { execute: jest.fn() };

      // Act
      container.register('MockService', mockService1);
      container.register('MockService', mockService2);

      // Assert
      expect(container['instances'].get('MockService')).toBe(mockService2);
    });
  });

  describe('resolve', () => {
    it('should retrieve the instance for a registered service', () => {
      // Arrange
      const mockService = { execute: jest.fn() };
      container['instances'].set('MockService', mockService); // Bypass `register` for unit isolation

      // Act
      const resolvedService = container.resolve('MockService');

      // Assert
      expect(resolvedService).toBe(mockService);
    });

    it('should throw an error if the service is not found', () => {
      // Act & Assert
      expect(() => container.resolve('NonExistent')).toThrow('NonExistent not found');
    });
  });

});

