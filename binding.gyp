{
  "targets": [
    {
      "target_name": "journald_cpp",
      "sources": [ "src/journald_cpp.cc" ],
      'libraries': [ "<!@(pkg-config --libs-only-l libsystemd-journal)" ]
    }
  ]
}
