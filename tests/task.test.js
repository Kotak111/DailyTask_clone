const request = require('supertest');

let token; // Store the JWT token for authenticated routes

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'password123' });
  token = res.body.token;
});

describe('POST /api/tasks', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Task',
        description: 'This is a test task',
        assignedUser: 'user1',
        dueDate: '2024-10-10'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('task');
  });

  it('should not create a task if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: '', description: '' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'All fields are required');
  });
});
describe('GET /api/tasks', () => {
    it('should return a list of tasks', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.tasks).toBeInstanceOf(Array);
    });
  });
  describe('PUT /api/tasks/:id', () => {
    it('should update a task successfully', async () => {
      const taskId = '615f1e4b2b9b2e3f7b9a9e4d'; // Replace with a valid task ID
      const res = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated Task', description: 'Updated description' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.task.name).toEqual('Updated Task');
    });
  
    it('should return an error if the task does not exist', async () => {
      const res = await request(app)
        .put('/api/tasks/invalidTaskId')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Task', description: 'Desc' });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'Invalid task ID');
    });
  });
  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task successfully', async () => {
      const taskId = '615f1e4b2b9b2e3f7b9a9e4d'; // Replace with a valid task ID
      const res = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'Task deleted successfully');
    });
  });
    