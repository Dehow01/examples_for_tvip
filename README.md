  <h3 align="center">Примеры из проекта для ООО "Южно-региональный регстратор"</h3>
  <p align="center">
В данном репозитории представлены некоторые компоненты и сервисы, использующиеся в проекте
    </p>


<!-- О проекте -->
## О проекте

Для уполномоченного регистратора необходимо было создать веб-приложение, позволяющее исключить бумажный документооборот между эмитентами и менеджерами. При этом необходимо было разработать функционал, предоставляющий пользователю возможность подписать прикрепленные документы УКЭП (Усиленной квалифицированной электронной подписью).

### Стек
В данное проекте использовался следующий стек: 
* Angular8
* Bootstrap
* Java Spring


### Компонент SignDoc
Предназначен для принятия файлов, подписи файлов с помощью crypto pro browser plugin и возвращения массива файлов и подписей.

### Компонент ManagerMeetings
Предназначен для отображения календаря утвержденных собраний и архива либо новых заявок, либо утвержденных на конкретный месяц

### Компонент ChangeUserData
Предназначен для отображения эмитентов, которые внесли изменения в анкету, поиска необходимого эмитента и изменения информации по нему.

### Сервис Authentication
Предназначен для авторизации и аутентификации пользователя как по логину и паролю, так и через сертфикикат ЭП, если пользователь ранее загрузил его.

### Интерспеторы jwt и error
Предназначены соответсвено для перехвата ошибок и проверки токена.

<!-- CONTACT -->
## Контакты

[Balavnev Danil](https://t.me/veland) - dehow@mail.ru


