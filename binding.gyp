{
  "targets": [
    {
      "target_name": "journald_cpp",
      "sources": [ "src/journald_cpp.cc" ],
      'libraries': [ '/lib64/libsystemd-journal.so' ]
    }
  ]
}