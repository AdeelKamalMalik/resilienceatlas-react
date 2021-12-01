set :repo_url, 'git@github.com:AdeelKamalMalik/resilienceatlas-react.git'

server '3.217.177.118', user: 'ubuntu', roles: %w{web app db}, primary: true

set :ssh_options, {
  user: "ubuntu",
  keys: ["~/Documents/personal/adeelkmalik_private_key.txt"]
}

set :rvm_custom_path, '/home/ubuntu/.rvm'
set :node_env, 'production'
set :branch, 'develop'