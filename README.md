# Resilience Atlas web app

This is the web app powering
[resilienceatlas.org](http://www.resilienceatlas.org)

## Installation

Requirements:

- NodeJs 11.9.0+ [How to install](https://nodejs.org/download/)
- npm 6.9.0+
- yarn 1.13.0+ (you can use npm instead)

Install project dependencies:

    yarn

## Usage

Before running the application, you need to configure it by copying `.env.example` to `.env` and setting the appropriate values where needed.

To start the application, run:

    yarn start

## Production build

To compile production build, run:

    yarn build

and then you can use your prodiction build locally:

    npm i -g serve
    serve -s build

## Deploy (Capistrano)

You need ruby version 2.2.1, then you have to install gems using `bundle install`. To deploy to staging you have to run:

```
    cap staging deploy
```

As the deploy task takes a lot of memory we have to run the compilation separately, go to the `current` folder and run the next command:

```
	npm run --max-old-memory-size=1024 build
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am '[Feature] Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D
