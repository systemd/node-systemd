{
  "targets": [
    {
      "target_name": "journald_lib",
      "sources": [ "src/journald_lib.cc" ],
      'libraries': [ '/lib64/libsystemd-journal.so' ]
    }
  ]
}