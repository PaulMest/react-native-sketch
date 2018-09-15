require "json"
package = JSON.parse(File.read('package.json'))

Pod::Spec.new do |s|
  s.name          = package['name']
  s.version       = package['version']
  s.summary       = package['description']
  s.author        = package['author']
  s.license       = package['license']
  s.requires_arc  = true
  s.homepage      = "https://github.com/PaulMest/react-native-sketch"
  s.source        = { :git => 'https://github.com/PaulMest/react-native-sketch.git' }
  s.platform      = :ios, '8.0'
  s.source_files  = "RNSketch/*.{h,m}"
  s.dependency 'React'
end
