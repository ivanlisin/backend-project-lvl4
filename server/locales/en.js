// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        edit: {
          error: 'Failed to update the user data',
          success: 'The user data is successfully updated',
        },
        delete: {
          error: 'Failed to delete the user',
          success: 'The user is successfully deleted',
        },
      },
      statuses: {
        create: {
          error: 'Failed to create status',
          success: 'Status created successfully',
        },
        edit: {
          notFound: 'Status not found',
          error: 'Failed to update status data',
          success: 'Status data updated successfully',
        },
        delete: {
          error: 'Failed to delete status',
          success: 'Status deleted successfully',
        },
      },
      tasks: {
        info: {
          error: 'Task does not exist',
        },
        create: {
          error: 'Failed to create task',
          success: 'Task created successfully',
        },
        edit: {
          notFound: 'Task not found',
          error: 'Failed to update task data',
          success: 'Task data updated successfully',
        },
        delete: {
          error: 'Failed to delete task',
          success: 'Task deleted successfully',
        },
      },
      authError: 'Access denied! Please login',
      accessError: 'You do not have access',
    },
    layouts: {
      application: {
        users: 'Users',
        statuses: 'Statuses',
        tasks: 'Tasks',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },
      users: {
        id: 'ID',
        firstName: 'First name',
        lastName: 'Last name',
        fullName: 'Full name',
        email: 'Email',
        password: 'Password',
        createdAt: 'Created at',
        title: 'Users',
        new: {
          submit: 'Register',
          signUp: 'Register',
        },
        edit: {
          title: 'Edit user data',
          button: 'Edit',
        },
        delete: 'Delete',
      },
      statuses: {
        id: 'ID',
        name: 'Name',
        title: 'Statuses',
        new: {
          title: 'Create status',
          button: 'Create',
        },
        edit: {
          title: 'Edit status data',
          button: 'Edit',
        },
      },
      tasks: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        creator: 'Creator',
        executor: 'Executor',
        createdAt: 'Created at',
        title: 'Tasks',
        new: {
          title: 'Create task',
          button: 'Create',
        },
        edit: {
          title: 'Edit task data',
          button: 'Edit',
        },
        delete: 'Delete',
      },
    },
  },
};
