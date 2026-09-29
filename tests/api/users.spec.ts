import { test, expect } from '@playwright/test';

test.describe('ReqRes API Tests', () => {

  test('GET users - page 2', async ({ request }) => {

    const response = await request.get(
      'https://reqres.in/api/users?page=2'
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody.data)).toBe(true);

    for (const user of responseBody.data) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
    }
  });


  test('POST create user', async ({ request }) => {

    const userData = {
      name: 'morpheus',
      job: 'leader',
    };

    const response = await request.post(
      'https://reqres.in/api/users',
      {
        data: userData,
      },
    );

    expect(response.status()).toBe(201);

    const createdUser = await response.json();

    expect(createdUser.name).toBe(userData.name);
    expect(createdUser.job).toBe(userData.job);

    expect(createdUser.id).toBeTruthy();
    expect(createdUser.createdAt).toBeTruthy();
  });

});