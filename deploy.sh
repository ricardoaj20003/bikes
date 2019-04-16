sed -i '.original' -e 's~http://localhost:3000~https://api.donmandon.com.mx~g' app/js/bundle.js.min
rm -rf app/js/bundle.js.min.original
sed -i '.original' -e 's~http://localhost:3000~https://api.donmandon.com.mx~g' app/views/solicita-pago.html
rm -rf app/views/solicita-pago.html.original
sed -i '.original' -e 's~http://localhost:3000~https://api.donmandon.com.mx~g' app/views/solicita.html
rm -rf app/views/solicita.html.original