// @ts-check

export default {
  translation: {
    appName: 'Менеджер Задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        edit: {
          error: 'Не удалось обновить данные пользователя',
          success: 'Данные пользователя успешно обновлены',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
          success: 'Пользователь успешно удален',
        },
      },
      statuses: {
        create: {
          error: 'Не удалось создать статус',
          success: 'Статус успешно создан',
        },
        edit: {
          notFound: 'Статус не найден',
          error: 'Не удалось обновить данные статуса',
          success: 'Данные статуса успешно обновлены',
        },
        delete: {
          error: 'Не удалось удалить статус',
          success: 'Статус успешно удален',
        },
      },
      labels: {
        create: {
          error: 'Не удалось создать метку',
          success: 'Метка успешно создана',
        },
        edit: {
          notFound: 'Метка не найдена',
          error: 'Не удалось обновить данные метки',
          success: 'Данные метки успешно обновлены',
        },
        delete: {
          error: 'Не удалось удалить метку',
          success: 'Метка успешно удалена',
        },
      },
      tasks: {
        info: {
          error: 'Задачи не существует',
        },
        create: {
          error: 'Не удалось создать задачу',
          success: 'Задача успешно создана',
        },
        edit: {
          notFound: 'Задача не найдена',
          error: 'Не удалось обновить данные задачи',
          success: 'Данные задачи успешно обновлены',
        },
        delete: {
          error: 'Не удалось удалить задачу',
          success: 'Задача успешно удалена',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь',
      accessError: 'У вас нет доступа',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        statuses: 'Статусы',
        labels: 'Метки',
        tasks: 'Задачи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      welcome: {
        public: {
          title: 'Здравствуйте',
          message: 'Для продолжения необходимо:',
          link: 'Войти в аккаунт',
        },
      },
      users: {
        id: 'ID',
        firstName: 'Имя',
        lastName: 'Фамилия',
        fullName: 'Полное имя',
        email: 'Email',
        password: 'Пароль',
        createdAt: 'Дата создания',
        title: 'Пользователи',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        edit: {
          title: 'Изменить данные пользователя',
          button: 'Изменить',
        },
        delete: 'Удалить',
      },
      statuses: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        title: 'Статусы',
        new: {
          title: 'Создать статус',
          button: 'Создать',
        },
        edit: {
          title: 'Изменить данные статуса',
          button: 'Изменить',
        },
        delete: 'Удалить',
      },
      labels: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        title: 'Метки',
        new: {
          title: 'Создать метку',
          button: 'Создать',
        },
        edit: {
          title: 'Изменить данные метки',
          button: 'Изменить',
        },
        delete: 'Удалить',
      },
      tasks: {
        id: 'ID',
        name: 'Наименование',
        description: 'Описание',
        status: 'Статус',
        creator: 'Создатель',
        executor: 'Исполнитель',
        label: 'Метка',
        createdAt: 'Дата создания',
        title: 'Задачи',
        new: {
          title: 'Создать задачу',
          button: 'Создать',
        },
        edit: {
          title: 'Изменить данные задачи',
          button: 'Изменить',
        },
        delete: 'Удалить',
      },
    },
  },
};
