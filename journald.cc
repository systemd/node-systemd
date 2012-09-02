#include <node.h>
#include <v8.h>
#include <systemd/sd-journal.h>
#include <stdlib.h>

using namespace std;
using namespace v8;

/**
 * Log string messages to the journal. Type checking of the arguments is performed
 * in the journald.js module.
 */
Handle<Value> SdJournalSend(const Arguments& args) {
  HandleScope scope;
  int argc = args.Length();
  struct iovec *iov = NULL;

  iov = (iovec*) malloc(argc * sizeof(struct iovec));
  if (!iov) {
    return ThrowException(String::New("Out of memory"));
  }

  // Iterate through the JS arguments and fill the iovector.
  for (int i = 0; i < argc; ++i) {
    Local<String> v8str = args[i]->ToString();

    iov[i].iov_len = v8str->Length();
    iov[i].iov_base = (char*) malloc(v8str->Length() + 1);

    v8str->WriteAscii((char*)iov[i].iov_base, 0, iov[i].iov_len);
  }

  sd_journal_sendv(iov, argc);

  for (int i = 0; i < argc; ++i) {
    free(iov[i].iov_base);
  }
  free(iov);

  return scope.Close(Integer::New(1));
}

void init(Handle<Object> target) {
  target->Set(String::NewSymbol("send"), FunctionTemplate::New(SdJournalSend)->GetFunction());
}

NODE_MODULE(journald, init)
